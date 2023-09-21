package com.incogvito.articles.serversideeventsexample.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor(staticName = "of")
public class SseEventModel {
    private String message;
    private ProcessStatus processStatus;
}
