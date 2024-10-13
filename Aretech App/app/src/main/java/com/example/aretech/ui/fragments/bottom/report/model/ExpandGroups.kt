package com.example.aretech.ui.fragments.bottom.report.model

data class ExpandGroups(
    var isExpanded:Boolean = false,
    val reports:List<ReportInGroup> = emptyList()
)
