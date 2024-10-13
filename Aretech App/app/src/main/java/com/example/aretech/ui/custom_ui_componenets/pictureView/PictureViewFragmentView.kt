package com.example.aretech.ui.custom_ui_componenets.pictureView

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.aretech.R
import kotlinx.coroutines.launch

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun PictureViewFragmentView(modifier: Modifier = Modifier, imageUrlList: Array<String>?, currentIndex: Int?, dismiss: () -> Unit) {


    val pagerState = rememberPagerState(
        initialPage = currentIndex ?: 0,
        pageCount = { imageUrlList?.size ?: 0 }
    )

    val scope = rememberCoroutineScope()

    Box(modifier = modifier) {

        HorizontalPager(
            state = pagerState,
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(1f)
        ) {
            PicturePreview(imageUrlList?.get(it))
        }

        Row(modifier = Modifier
            .fillMaxWidth()
            .height(60.dp)
            .align(Alignment.BottomCenter), verticalAlignment = Alignment.CenterVertically) {

            Column(modifier = Modifier
                .fillMaxHeight()
                .fillMaxWidth(0.2f), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                if (pagerState.canScrollBackward) PicturePreviewActionButton(
                    iconColor = R.color.primary_500,
                    icon = R.drawable.ic_arrow_left,
                    onClick = { scope.launch { pagerState.animateScrollToPage(pagerState.currentPage - 1) } })
            }

            Column(modifier = Modifier
                .fillMaxHeight()
                .fillMaxWidth(0.75f), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                PicturePreviewActionButton(
                    iconColor = R.color.error_500,
                    icon = R.drawable.ic_close,
                    onClick = { dismiss() })
            }

            Column(modifier = Modifier
                .fillMaxHeight()
                .fillMaxWidth(1f), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                if (pagerState.canScrollForward) PicturePreviewActionButton(
                    iconColor = R.color.primary_500,
                    icon = R.drawable.ic_ios_right_arrow,
                    onClick = { scope.launch { pagerState.animateScrollToPage(pagerState.currentPage + 1) } })
            }
        }
    }
}