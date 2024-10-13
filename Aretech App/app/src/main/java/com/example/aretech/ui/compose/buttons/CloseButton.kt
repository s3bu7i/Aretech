package com.example.aretech.ui.compose.buttons

import androidx.compose.runtime.Composable
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.task.views.common.ImageInRoundShapeCard

@Composable
fun CloseButton(onClick: () -> Unit) {
    ImageInRoundShapeCard(
        image = R.drawable.ic_close,
        description = "Close",
    ) { onClick() }
}