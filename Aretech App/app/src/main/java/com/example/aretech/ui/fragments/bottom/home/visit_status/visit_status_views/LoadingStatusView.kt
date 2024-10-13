package com.example.aretech.ui.fragments.bottom.home.visit_status.visit_status_views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import com.example.aretech.R
import com.example.aretech.ui.compose.dialogs.CircularProgressBar

@Composable
fun LoadingStatusView(isLoadingShow:Boolean) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(color = colorResource(id = R.color.black)),
        contentAlignment = Alignment.Center
    ) {
        if (isLoadingShow)
            CircularProgressBar()
    }
}