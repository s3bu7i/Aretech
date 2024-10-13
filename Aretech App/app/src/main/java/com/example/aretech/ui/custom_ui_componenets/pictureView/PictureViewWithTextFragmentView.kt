package com.example.aretech.ui.custom_ui_componenets.pictureView

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R

@Composable
fun PictureViewWithTextFragmentView(modifier: Modifier = Modifier, imageUrlList: Array<String>?, currentIndex: Int?, text: String, dismiss: () -> Unit) {
    Column(modifier = modifier, horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.SpaceBetween) {
        PictureViewFragmentView(modifier = Modifier.weight(1f), imageUrlList, currentIndex, dismiss)
        Text(modifier = Modifier
            .fillMaxWidth(0.9f)
            .padding(top = 4.dp, bottom = 40.dp), text = text,
            color = colorResource(id = R.color.primary_500),
            fontSize = 16.sp,
            fontWeight = FontWeight.Medium,
            fontFamily = FontFamily(Font(R.font.sf_pro_medium))
            )
    }
}