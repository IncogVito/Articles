package com.incogvito.articles.serversideeventsexample.service;

import com.incogvito.articles.serversideeventsexample.model.ProcessStatus;
import com.incogvito.articles.serversideeventsexample.model.SseEventModel;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Log4j2
@Component
public class SseEventProcessor {
    private final Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    public SseEmitter createSseEmitter(Long userId) {
        SseEmitter sseEmitter = new SseEmitter(40000L);
        sseEmitters.put(userId, sseEmitter);
        return sseEmitter;
    }

    @Async
    public void completeSseEmitter(Long userId) {
        SseEmitter sseEmitter = sseEmitters.get(userId);
        log.info("Completing");
        if (sseEmitter != null) {
            log.info("Completed");
            sseEmitter.complete();
        }
    }

    @SneakyThrows
    @Async
    public synchronized void triggerSseEmitter(Long userId, String message, ProcessStatus processStatus) {
        SseEmitter sseEmitter = sseEmitters.get(userId);
        if (sseEmitter != null) {
            try {
                sseEmitter.send(SseEventModel.of(message, processStatus));
            } catch (ClientAbortException clientAbortException) {
              log.info("Client {} stopped the connection.", userId);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
