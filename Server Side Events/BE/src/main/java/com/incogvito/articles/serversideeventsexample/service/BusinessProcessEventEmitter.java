package com.incogvito.articles.serversideeventsexample.service;

import com.incogvito.articles.serversideeventsexample.model.ProcessState;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.MessageSource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Log4j2
@Component
@RequiredArgsConstructor
public class BusinessProcessEventEmitter {

    private final List<ProcessState> HAPPY_PATH = List.of(
            ProcessState.STARTING, ProcessState.FETCHING_DATA, ProcessState.BROADCASTING_INFO, ProcessState.FINISHED
    );
    private final List<ProcessState> NO_DATA_STATE = List.of(
            ProcessState.STARTING, ProcessState.FETCHING_DATA, ProcessState.NOT_FOUND_DATA, ProcessState.FINISHED
    );
    private final List<ProcessState> ERROR_PATH = List.of(
            ProcessState.STARTING, ProcessState.FETCHING_DATA, ProcessState.ERROR_OCCURRED
    );
    private final List<List<ProcessState>> ALL_PATHS = List.of(HAPPY_PATH, NO_DATA_STATE, ERROR_PATH);
    private final SseEventProcessor sseEventProcessor;
    private final MessageSource messageSource;

    @Async
    public void startMonitoringProcess(Long userId) {
        log.info("Monitoruje process USERID: " + userId);
        List<ProcessState> processStates = getRandomPath();
        runProcess(userId, new LinkedList<>(processStates));
    }

    @SneakyThrows
    public void runProcess(Long userId, Queue<ProcessState> processStates) {
        ProcessState processState = processStates.remove();
        notifyUser(userId, processState);

        long randomSleepTime = getRandomSleepTime();
        log.info("Jestem thread " + Thread.currentThread().getName() + " spie przez " + randomSleepTime);
        Thread.sleep(randomSleepTime);
        log.info("Jestem thread " + Thread.currentThread().getName() + " obudziłem sie");

        if (!CollectionUtils.isEmpty(processStates)) {
            runProcess(userId, processStates);
        }
    }

    public void notifyUser(Long userId, ProcessState processState) {
        String message = messageSource.getMessage(processState.getMessageCode(), new Object[]{}, Locale.getDefault());
        sseEventProcessor.triggerSseEmitter(userId, message, processState.getProcessStatus());
    }

    private long getRandomSleepTime() {
        Random random = new Random();
        int min = 2000;
        int max = 6000;
        return random.nextInt(max - min + 1) + min;
    }

    public List<ProcessState> getRandomPath() {
        Random rand = new Random();
        return ALL_PATHS.get(rand.nextInt(ALL_PATHS.size()));
    }
}
