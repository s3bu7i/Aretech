package com.example.aretech.ui.custom_ui_componenets

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun SumViewsForBottomSheet(
    textBlur:Boolean,
    onDismiss:()->Unit,
    names:List<String>,
    amounts:List<String>,
){
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ){
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight()
                .padding(bottom = 15.dp)
                .clip(
                    shape = RoundedCornerShape(15.dp)
                ),
            colors = CardDefaults.cardColors(
                containerColor =  colorResource(id = R.color.primary_50)
            )
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(
                        top = 15.dp,
                        bottom = 15.dp,
                        end = 15.dp,
                        start = 15.dp
                    ),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    modifier = Modifier
                        .weight(1f)
                        .padding(start = 36.dp),
                    text = stringResource(id = R.string.general),
                    fontSize = 23.sp,
                    textAlign = TextAlign.Center,
                    color = colorResource(id = R.color.grey_scale_900),
                    fontFamily = FontFamily(
                        Font(
                            R.font.sf_pro_medium,
                            FontWeight.Medium
                        )
                    )
                )
                CardCloseButton{
                    onDismiss()
                }
            }
        }
        LazyVerticalGrid(columns = GridCells.Fixed(2), modifier = Modifier.background(
            Color.White)) {
            items(names.size) {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 15.dp, vertical = 10.dp)
                        .clip(
                            shape = RoundedCornerShape(20.dp),
                        ),
                    colors = CardDefaults.cardColors(
                        containerColor = colorResource(id = R.color.primary_50)
                    )
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(vertical = 10.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        val radius = if (textBlur){
                            if (it > 0) 10.dp
                            else 0.dp
                        }
                        else 0.dp

                        Text(
                            text = amounts[it].removeSuffix(".0"),
                            textAlign = TextAlign.Center,
                            color = colorResource(id = R.color.primary_500),
                            modifier = Modifier
                                .fillMaxWidth()
                                .blur(radius = radius),
                            fontSize = 15.sp,
                            fontFamily = FontFamily(
                                Font(R.font.sf_pro_medium, weight = FontWeight.Medium)
                            )
                        )
                        Text(
                            text = names[it],
                            modifier = Modifier.fillMaxWidth(),
                            textAlign = TextAlign.Center,
                            fontSize = 16.sp,
                            fontFamily = FontFamily(
                                Font(R.font.sf_pro_display, weight = FontWeight.Medium)
                            ),
                            color = colorResource(id = R.color.grey_scale_900),
                        )
                    }

                }

            }
        }
        Spacer(
            Modifier
                .width(135.dp)
                .padding(top = 20.dp, bottom = 10.dp)
                .height(4.dp)
                .background(color = colorResource(id = R.color.divider_color), shape = CircleShape)
        )
    }
}