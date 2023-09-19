package com.incogvito.articles.serversideeventsexample.controller;

import com.incogvito.articles.serversideeventsexample.model.SseEventModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class SSEController {

    private final Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    @GetMapping("/create/{userId}")
    public SseEmitter createSseEmitter(@PathVariable Long userId) {
        SseEmitter sseEmitter = new SseEmitter();
        sseEmitters.put(userId, sseEmitter);
        return sseEmitter;
    }

    @GetMapping("/trigger/{userId}/{message}")
    public void triggerSseEmitter(@PathVariable Long userId, @PathVariable String message) {
        SseEmitter sseEmitter = sseEmitters.get(userId);
        if (sseEmitter != null) {
            try {
                sseEmitter.send(SseEventModel.of(message)); // Wysyłanie dowolnej wiadomości do klienta
                sseEmitter.complete(); // Zakończenie strumienia po wysłaniu wiadomości
            } catch (IOException e) {
                // Obsługa błędów związanych z wysyłaniem SSE
                e.printStackTrace();
            }
        }
    }
}
