package com.example.aretech.ui.activities.menu.checks.main.views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R

@Composable
fun StatusCardTextView(status: Int) {
    val text: Int = R.string.error_text
    val cardColor: Int = remember { when (status) {
        0 -> R.color.warning_500_30
        2 -> R.color.error_500
        1 -> R.color.primary_500
        else -> R.color.primary_50
            } }
    Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.End
    ) {
        Box(modifier = Modifier
            .clip(RoundedCornerShape(12.dp))
            .background(color = colorResource(id = cardColor)), contentAlignment = Alignment.Center){
            Text(
                modifier = Modifier.padding(vertical = 2.dp, horizontal = 5.dp),
                text = stringResource(id = text),
                color = colorResource(id = when(status){
                    1,2 -> R.color.white
                    else -> R.color.grey_scale_300
                }),
                fontFamily = FontFamily(Font(R.font.sf_pro_display_bold, FontWeight.Bold)),
                maxLines = 1,
                fontSize = 10.sp,
            )
        }
    }

}