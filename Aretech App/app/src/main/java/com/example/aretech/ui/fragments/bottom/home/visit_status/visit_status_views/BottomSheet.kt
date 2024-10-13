package com.example.aretech.ui.fragments.bottom.home.visit_status.visit_status_views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R
import com.example.aretech.ui.fragments.bottom.home.visit_status.visit_status_views.rating_bar.RatingBar
import com.example.aretech.ui.fragments.bottom.home.visit_status.visit_status_views.rating_bar.RatingBarStyle

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BottomSheet(
    onDismiss:() -> Unit
) {
    val modalBottomSheetState = rememberModalBottomSheetState()
    var rating by remember { mutableStateOf(0f) }
  
    ModalBottomSheet(
        sheetState = modalBottomSheetState,
        onDismissRequest = { onDismiss()}
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(colorResource(id = R.color.white)),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
                Divider(
                    modifier = Modifier
                        .width(80.dp)
                        .height(3.dp)
                        .padding(bottom = 13.dp)
                        .background(colorResource(id = R.color.appreciate_divider_color))
                )
                Text(
                    text = "Dəyərləndirmə",
                    fontSize = 20.sp,
                    color = colorResource(id = R.color.dark_blue),
                    modifier = Modifier.padding(13.dp)
                )
                RatingBar(
                    value = rating*5,
                    style = RatingBarStyle.Fill(),
                    modifier = Modifier.padding(13.dp)
                )
            Slider(
                value = rating,
                onValueChange = {
                    rating = it
                },
                colors = SliderDefaults.colors(
                    thumbColor = colorResource(id = R.color.colorLogo),
                    activeTrackColor =  colorResource(id = R.color.colorLogo),
                    inactiveTrackColor = colorResource(id = R.color.appreciate_divider_color),
                ),
                modifier = Modifier.padding(10.dp)
            )

        }
    }
}