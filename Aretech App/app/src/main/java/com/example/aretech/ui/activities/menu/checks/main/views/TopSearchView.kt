package com.example.aretech.ui.activities.menu.checks.main.views

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.TextSelectionColors
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R

@Composable
fun TopSearchView(modifier: Modifier = Modifier, searchText: String, onSearchTextChange: (String) -> Unit) {

    Card(
        colors = CardDefaults.cardColors(
            containerColor = colorResource(id = R.color.white)
        ),
        modifier = modifier
            .wrapContentHeight(),
        shape = RoundedCornerShape(10.dp),
        border = BorderStroke(1.dp, color = colorResource(id = R.color.grey_scale_50)),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                painter = painterResource(id = R.drawable.ic_search),
                contentDescription = "Search",
                tint = colorResource(id = R.color.grey_scale_100)
            )
            TextField(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                value = searchText,
                singleLine = true,
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = Color.White,
                    unfocusedContainerColor = Color.White,
                    disabledContainerColor = Color.White,
                    cursorColor = colorResource(id = R.color.primary_500),
                    selectionColors = TextSelectionColors(handleColor = colorResource(id = R.color.primary_500), backgroundColor = colorResource(id = R.color.primary_50)),
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent,
                    disabledIndicatorColor = Color.Transparent,
                ),
                onValueChange = { onSearchTextChange(it) },
                placeholder = {
                    Text(
                        text = stringResource(id = R.string.search),
                        color = colorResource(id = R.color.grey_scale_100),
                        fontFamily = FontFamily(Font(R.font.sf_pro_medium, FontWeight.Medium)),
                        fontSize = 13.sp,
                        maxLines = 2,
                        overflow = TextOverflow.Clip
                    )
                },
                textStyle = TextStyle(
                    color = colorResource(id = R.color.text_color_header),
                    fontFamily = FontFamily(Font(R.font.sf_pro_medium, FontWeight.Medium)),
                    fontSize = 13.sp,
                )
            )
            if (searchText.isNotBlank()) {
                Icon(
                    modifier = Modifier
                        .clip(RoundedCornerShape(7.dp))
                        .clickable { onSearchTextChange("") },
                    painter = painterResource(id = R.drawable.ic_close_circle),
                    contentDescription = "Search",
                )
            }
        }
    }
}