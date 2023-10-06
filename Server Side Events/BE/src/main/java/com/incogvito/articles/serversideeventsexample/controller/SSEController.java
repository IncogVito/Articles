package com.incogvito.articles.serversideeventsexample.controller;

import com.incogvito.articles.serversideeventsexample.model.ProcessStatus;
import com.incogvito.articles.serversideeventsexample.service.BusinessProcessEventEmitter;
import com.incogvito.articles.serversideeventsexample.service.SseEventProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class SSEController {

    private final SseEventProcessor sseEventProcessor;
    private final BusinessProcessEventEmitter businessProcessEventEmitter;

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/create/{userId}")
    public SseEmitter createSseEmitter(@PathVariable Long userId) {
        SseEmitter sseEmitter = sseEventProcessor.createSseEmitter(userId);
        businessProcessEventEmitter.startMonitoringProcess(userId);
        return sseEmitter;
    }
}
