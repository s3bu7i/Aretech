package com.example.aretech.ui.custom_ui_componenets.pictureView

import androidx.annotation.ColorRes
import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp


@Composable
fun PicturePreviewActionButton(@DrawableRes icon: Int, @ColorRes iconColor: Int, onClick: () -> Unit) {
        Card(
            shape = RoundedCornerShape(10.dp),
            modifier = Modifier
                .size(50.dp)
                .padding(bottom = 10.dp),
            colors = CardDefaults.cardColors(containerColor = Color.Transparent)
        ) {
            Image(
                painter = painterResource(id = icon),
                contentDescription = "",
                colorFilter = ColorFilter.tint(colorResource(iconColor)),
                modifier = Modifier
                    .size(50.dp)
                    .clickable { onClick() }
            )
    }
}

