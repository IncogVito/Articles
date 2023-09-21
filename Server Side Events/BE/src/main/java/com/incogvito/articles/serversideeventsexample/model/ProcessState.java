package com.incogvito.articles.serversideeventsexample.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProcessState {
    STARTING(ProcessStatus.SUCCESS, "process.message.starting"),
    FETCHING_DATA(ProcessStatus.SUCCESS, "process.message.fetching.data"),
    BROADCASTING_INFO(ProcessStatus.SUCCESS, "process.message.broadcasting"),
    NOT_FOUND_DATA(ProcessStatus.WARNING, "process.message.no.data.found"),
    FINISHED(ProcessStatus.SUCCESS, "process.message.finished"),
    ERROR_OCCURRED(ProcessStatus.ERROR, "process.message.error.occurred");

    private final ProcessStatus processStatus;
    private final String messageCode;
}
