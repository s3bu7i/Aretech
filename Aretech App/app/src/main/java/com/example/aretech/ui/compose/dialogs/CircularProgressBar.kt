package com.example.aretech.ui.compose.dialogs

import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun CircularProgressBar() {
    CircularProgressIndicator(
        modifier = Modifier
            .height(70.dp)
            .width(70.dp),
        color = Color.Green,
    )
}