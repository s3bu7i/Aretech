package com.example.aretech.ui.fragments.bottom.home.visit_status.visit_status_views.rating_bar

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.semantics.SemanticsPropertyKey
import androidx.compose.ui.semantics.SemanticsPropertyReceiver
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.toSize
import com.example.aretech.ui.fragments.bottom.home.visit_status.visit_status_views.RatingStar


sealed class RatingBarStyle(open val activeColor: Color) {
    open class Fill(
        override val activeColor: Color = Color(0xFF25D366),
        val inActiveColor: Color = Color(0xFFC1C6CA),
    ) : RatingBarStyle(activeColor)

    class Stroke(
        val width: Float = 1f,
        override val activeColor: Color = Color(0xFF25D366),
        val strokeColor: Color = Color(0xFFC1C6CA)
    ) : RatingBarStyle(activeColor)
}

val StarRatingKey = SemanticsPropertyKey<Float>("StarRating")
var SemanticsPropertyReceiver.starRating by StarRatingKey


@Composable
fun RatingBar(
    value: Float,
    modifier: Modifier = Modifier,
    numOfStars: Int = 5,
    size: Dp = 32.dp,
    spaceBetween: Dp = 6.dp,
    hideInactiveStars: Boolean = false,
    style: RatingBarStyle,
    painterEmpty: Painter? = null,
    painterFilled: Painter? = null,
) {
    var rowSize by remember { mutableStateOf(Size.Zero) }

    Row(modifier = modifier
        .onSizeChanged { rowSize = it.toSize() }) {
        ComposeStars(
            value,
            numOfStars,
            size,
            spaceBetween,
            hideInactiveStars,
            style = style,
            painterEmpty,
            painterFilled
        )
    }
}



@Composable
fun ComposeStars(
    value: Float,
    numOfStars: Int,
    size: Dp,
    spaceBetween: Dp,
    hideInactiveStars: Boolean,
    style: RatingBarStyle,
    painterEmpty: Painter?,
    painterFilled: Painter?
) {
    val ratingPerStar = 1f
    var remainingRating = value

    Row(modifier = Modifier
        .semantics { starRating = value }) {
        for (i in 1..numOfStars) {
            val starRating = when {
                remainingRating == 0f -> {
                    0f
                }

                remainingRating >= ratingPerStar -> {
                    remainingRating -= ratingPerStar
                    1f
                }

                else -> {
                    val fraction = remainingRating / ratingPerStar
                    remainingRating = 0f
                    fraction
                }
            }
            if (hideInactiveStars && starRating == 0.0f)
                break

            RatingStar(
                fraction = starRating,
                style = style,
                modifier = Modifier
                    .padding(
                        start = if (i > 1) spaceBetween else 0.dp,
                        end = if (i < numOfStars) spaceBetween else 0.dp
                    )
                    .size(size = size) ,
                painterEmpty = painterEmpty,
                painterFilled = painterFilled
            )
        }
    }
}
