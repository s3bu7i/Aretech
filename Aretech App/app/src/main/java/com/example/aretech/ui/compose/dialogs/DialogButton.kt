package com.example.aretech.ui.compose.dialogs

import androidx.annotation.ColorRes
import androidx.annotation.StringRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R


@Composable
fun DialogPrimaryButton(modifier: Modifier = Modifier, @StringRes text: Int, isEnabled: Boolean = true, onClick: () -> Unit) {
    DialogButton(modifier = modifier, text = stringResource(id = text), cardColor = R.color.primary_500, textColorRes = R.color.white, isEnabled = isEnabled, onClick = onClick)
}

@Composable
fun DialogWhiteButton(modifier: Modifier = Modifier, @StringRes text: Int, isEnabled: Boolean = true, onClick: () -> Unit) {
    DialogButton(modifier = modifier, text = stringResource(id = text), cardColor = R.color.white, textColorRes = R.color.grey_scale_900, isEnabled = isEnabled, onClick = onClick)
}


@Composable
private fun DialogButton(modifier: Modifier = Modifier, text: String, @ColorRes cardColor: Int, @ColorRes textColorRes: Int, isEnabled: Boolean = true, onClick: () -> Unit) {
    Card(
        modifier = modifier
            .height(50.dp),
        shape = CircleShape,
        colors = CardDefaults.cardColors(containerColor = colorResource(id = if (isEnabled) cardColor else R.color.grey_scale_100)),
        border = BorderStroke(1.dp, colorResource(id = R.color.grey_scale_50))
    ) {
        Box(
            modifier = Modifier.fillMaxSize().clickable { if (isEnabled) onClick() },
            contentAlignment = Alignment.Center
        ) {
            Text(
                color = colorResource(id = textColorRes),
                text = text,
                fontSize = 16.sp,
                fontFamily = FontFamily(Font(R.font.sf_pro_display)),
                textAlign = TextAlign.Center,
            )
        }
    }
}