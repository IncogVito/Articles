package com.incogvito.articles.serversideeventsexample.service;

import com.incogvito.articles.serversideeventsexample.model.ProcessStatus;
import com.incogvito.articles.serversideeventsexample.model.SseEventModel;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SseEventProcessor {
    private final Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    public SseEmitter createSseEmitter(Long userId) {
        SseEmitter sseEmitter = new SseEmitter(20000L);
        sseEmitters.put(userId, sseEmitter);
        return sseEmitter;
    }

    public void completeSseEmitter(Long userId) {
        SseEmitter sseEmitter = sseEmitters.get(userId);
        if (sseEmitter != null) {
            sseEmitter.complete();
        }
    }

    @Async
    public void triggerSseEmitter(Long userId, String message, ProcessStatus processStatus) {
        System.out.println("Triggeruje dla "+ userId + " " + Thread.currentThread().getName());
        SseEmitter sseEmitter = sseEmitters.get(userId);
        if (sseEmitter != null) {
            try {
                sseEmitter.send(SseEventModel.of(message, processStatus));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
