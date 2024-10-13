package com.example.aretech.domain.report.model


data class ParsedParamsItem (
    val queryData: List<Map<String,Any>>? = emptyList(),
    val typeValue: String? = null,
    val code: String? = null,
    val typeText: String? = null,
    val name: String? = null
)