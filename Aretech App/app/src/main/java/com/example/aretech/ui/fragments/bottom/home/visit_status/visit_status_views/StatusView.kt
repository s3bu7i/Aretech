package com.example.aretech.ui.fragments.bottom.home.visit_status.visit_status_views

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.TransformableState
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.aretech.R

@Composable
fun StatusView(
    loadingStatusProgress:MutableList<Float>?,
    hasUnReadStatusView:Boolean,
    modifier: Modifier,
    onLongPress: () -> Unit,
    onPress: () -> Unit,
    onTap: (offset: Offset) -> Unit,
    imageLoaded:(isLoaded:Boolean) -> Unit,
    state: TransformableState,
    enabled:Boolean,
    setEnabled:(isEnabled:Boolean) -> Unit,
    scale:Float,
    offset: Offset
) {
    if (hasUnReadStatusView && loadingStatusProgress?.contains(-1f) == false){
        Box(modifier = modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectTapGestures(
                    onLongPress = { onLongPress() },
                    onPress = {
                        awaitRelease()
                        onPress()
                    },
                    onTap = { onTap(it) }
                )
            },
        ) {
            AsyncImage(
                model ="statusImage.image",
                contentDescription = "Status Image",
                contentScale = ContentScale.Inside,
                onSuccess ={
                    imageLoaded(true)
                },
                onLoading = {
                    imageLoaded(false)
                },
                modifier = Modifier
                    .fillMaxSize()
                    .align(Alignment.Center)
                    .graphicsLayer {
                        scaleX = scale
                        scaleY = scale
                        translationX = offset.x
                        translationY = offset.y
                    }
                    .transformable(
                        state,
                        lockRotationOnZoomPan = true,
                        enabled = enabled
                    )
            )
            Card(
                shape = RoundedCornerShape(15.dp),
                modifier = Modifier
                    .padding(end = 15.dp, bottom = 25.dp)
                    .align(Alignment.BottomEnd)
                    .clickable {
                        if (enabled) setEnabled(false)
                        else setEnabled(true)
                    },
                backgroundColor = colorResource(id = R.color.colorBackground)
            ) {
                Image(
                    painter = if (enabled) painterResource(id = R.drawable.zoom_in)
                    else painterResource(id = R.drawable.zoom_out),
                    contentDescription = "Pause",
                    colorFilter = ColorFilter.tint(colorResource(id = R.color.dark_blue)),
                    modifier = Modifier.size(30.dp)
                        .padding(bottom = 5.dp, end = 5.dp, start = 5.dp, top = 5.dp),
                    contentScale = ContentScale.Inside
                )
            }
        }
    }

}



