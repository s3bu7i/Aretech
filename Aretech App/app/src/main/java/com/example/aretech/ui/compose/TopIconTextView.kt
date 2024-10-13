package com.example.aretech.ui.compose

import androidx.annotation.ColorRes
import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R

@Composable
fun TopIconTextView(
    modifier: Modifier = Modifier,
    @DrawableRes icon: Int,
    text: String,
    @ColorRes iconColor: Int = R.color.grey_scale_500,
    @ColorRes textColor: Int = R.color.grey_scale_200,
    onClick: () -> Unit
) {
    Card(modifier = modifier, colors = CardDefaults.cardColors(containerColor = colorResource(id = R.color.white)), shape = RoundedCornerShape(0.dp)) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Image(
                colorFilter = ColorFilter.tint(colorResource(id = iconColor)),
                painter = painterResource(id = icon),
                contentDescription = "",
                modifier = Modifier.size(24.dp)
            )
            Text(
                text = text,
                textAlign = TextAlign.Center,
                fontSize = 13.sp,
                fontFamily = FontFamily(Font(R.font.sf_pro_display, FontWeight.Normal)),
                color = colorResource(id = textColor),
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
            )
        }
    }
}

@Preview
@Composable
fun TopIconTextViewPreview() {
    TopIconTextView(icon = R.drawable.ic_operation_24, text = "Chart", onClick = {})
}