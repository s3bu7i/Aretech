package com.example.aretech.ui.fragments.bottom.report.model_state

import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.snapshots.SnapshotStateMap
import com.example.aretech.ui.fragments.bottom.report.model.ExpandGroups

data class GetAllReportState (
    val reportAndGroupsMap: SnapshotStateMap<String,ExpandGroups> =  mutableStateMapOf(),
    val isLoading:Boolean = false,
    val exceptions: String = ""
)