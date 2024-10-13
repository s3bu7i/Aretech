package com.example.aretech.ui.custom_ui_componenets.pictureView

import androidx.compose.runtime.Composable
import androidx.compose.foundation.gestures.rememberTransformableState
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.gestures.zoomBy
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.graphicsLayer
import coil.compose.AsyncImage


@Composable
fun ZoomablePictureView(
    modifier: Modifier,
    imageUrl: String?) {
    var scale by remember { mutableStateOf(1f) }
    var offset by remember { mutableStateOf(Offset.Zero) }

    BoxWithConstraints(modifier = modifier
        .fillMaxSize()){
        val state = rememberTransformableState { zoomChange, panChange, _ ->
            scale = (scale * zoomChange).coerceIn(1f, 5f)
            val extraWidth =
                ((scale - 1) * constraints.maxWidth) / 2
            val extraHeight =
                ((scale - 1) * constraints.maxHeight) / 2
            offset = Offset(
                x = (offset.x + panChange.x).coerceIn(
                    -extraWidth,
                    extraWidth
                ),
                y = (offset.y + panChange.y).coerceIn(
                    -extraHeight,
                    extraHeight
                )
            )
        }
            AsyncImage(
                model =imageUrl,
                contentDescription = "Image",
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.Center)
                    .graphicsLayer {
                        scaleX = scale
                        scaleY = scale
                        translationX = offset.x
                        translationY = offset.y
                    }.transformable( state,false)
            )
        LaunchedEffect(key1 = state.isTransformInProgress) {
            if (!state.isTransformInProgress) {
                state.zoomBy(0.0f)
            }
        }
        }



}