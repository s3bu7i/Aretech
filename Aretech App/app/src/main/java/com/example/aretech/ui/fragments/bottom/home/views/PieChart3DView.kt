package com.example.aretech.ui.fragments.bottom.home.views

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.graphics.Typeface
import android.util.AttributeSet
import android.view.View
import java.math.RoundingMode
import java.text.DecimalFormat
import java.text.DecimalFormatSymbols
import java.util.Locale
import kotlin.math.cos
import kotlin.math.sin

class PieChart3DView @JvmOverloads constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0) : View(context, attrs, defStyleAttr) {

    private val piePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val legendPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val legendTextPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.BLACK
        textSize = 40f
        typeface = Typeface.DEFAULT
    }
    private val shadowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        setShadowLayer(10f, 0f, 10f, Color.DKGRAY)
    }
    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.WHITE
        textSize = 45f
        textAlign = Paint.Align.CENTER
        typeface = Typeface.DEFAULT_BOLD
    }

    var pieSlices = emptyList<PieSlice>()
        set(value) {
            field = value
            invalidate()
        }

    @SuppressLint("DrawAllocation")
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val margin = 50f
        val pieWidth = width - 2 * margin
        val pieHeight = pieWidth * 0.7f
        val radiusX = pieWidth / 2
        val radiusY = pieHeight / 2

        val centerX = margin + pieWidth / 2f
        val centerY = margin + pieHeight / 2f
        val rect = RectF(margin, margin, pieWidth + margin, pieHeight + margin)

        var startAngle = 0f

        pieSlices.filter { it.value != 0f }.forEach { slice ->
            val slicePercent = roundOfDecimalFour(slice.value / pieSlices.sumOf { it.value.toDouble() }.toFloat())

            shadowPaint.color = slice.color
            shadowPaint.alpha = 100
            val sliceMiddleAngle = startAngle + (slicePercent * 360f / 2)

            var angleInRadians = Math.toRadians(sliceMiddleAngle.toDouble())

            if (startAngle > 180f) lightShadow(rect = rect, canvas = canvas, startAngle = startAngle, sweepAngle = slicePercent * 360f)
            else if (startAngle < 180f && startAngle + slicePercent * 360f >= 180f) {
                boldShadow(rect = rect, canvas = canvas, startAngle = startAngle, sweepAngle = 180f - startAngle)
                lightShadow(rect = rect, canvas = canvas, startAngle = 180f, sweepAngle = slicePercent * 360f - 180f + startAngle)
            }
            else boldShadow(rect = rect, canvas = canvas, startAngle = startAngle, sweepAngle = slicePercent * 360f)

            piePaint.color = slice.color
            canvas.drawArc(rect, startAngle, slicePercent * 360f, true, piePaint)


            var textScale = 0.9
            var percScale = 0.4
            if (sliceMiddleAngle > 300) {
                textScale = 0.8
                percScale = 0.35
            }

            if (slicePercent < 0.12) angleInRadians += 0.2f

            val textX = centerX + (radiusX * cos(angleInRadians)* textScale).toFloat()
            val textY = centerY + (radiusY * sin(angleInRadians)* textScale * 0.7f).toFloat()
            val textXPerc = centerX + (radiusX * cos(angleInRadians) * percScale).toFloat()
            val textYPerc = centerY + (radiusY * sin(angleInRadians) * percScale * 0.7).toFloat()

            canvas.drawText("${slice.value.toInt()}", textX, textY, textPaint)
            canvas.drawText("${(slicePercent * 100).toInt()} % ", textXPerc, textYPerc, textPaint)
            startAngle += slicePercent * 360f
        }

        drawLegends(canvas, rect.left, rect.bottom + 80f)
    }


    private fun drawLegends(canvas: Canvas, startX: Float, startY: Float) {
        val legendBoxSize = 40f
        val spacing = 20f
        var currentY = startY

        pieSlices.forEach { slice ->
            legendPaint.color = slice.color
            canvas.drawRect(startX, currentY, startX + legendBoxSize, currentY + legendBoxSize, legendPaint)
            canvas.drawText(slice.name, startX + legendBoxSize + spacing, currentY + (legendBoxSize / 1.5f), legendTextPaint)
            currentY += legendBoxSize + spacing
        }
    }

    fun roundOfDecimalFour(number: Float?): Float {
        val df = DecimalFormat("#.####", DecimalFormatSymbols(Locale.ENGLISH))
        return try {
            df.roundingMode = RoundingMode.DOWN
            df.format(number).toFloat()
        } catch (e: Exception) { number ?: 0f }
    }

    private fun lightShadow(rect: RectF, canvas: Canvas, startAngle: Float, sweepAngle: Float) {
        val shadowRect = RectF(rect.left, rect.top + 2f, rect.right, rect.bottom + 2f)
        canvas.drawArc(shadowRect, startAngle, sweepAngle, true, shadowPaint)
    }

    private fun boldShadow(rect: RectF, canvas: Canvas, startAngle: Float, sweepAngle: Float) {
        val shadowRect = RectF(rect.left, rect.top + 15f, rect.right, rect.bottom + 15f)
        canvas.drawArc(shadowRect, startAngle, sweepAngle, true, shadowPaint)
    }
}