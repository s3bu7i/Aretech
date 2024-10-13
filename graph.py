import matplotlib.pyplot as plt
import numpy as np

# Data
categories = ['Ecological Product Market', 'Mobile App Market', 'New App Projected Revenue (Year 1-2)']
values = [150, 100, 0.075]  # Values in millions USD

# Create the bar chart
fig, ax = plt.subplots(figsize=(10, 6))
bars = ax.bar(categories, values, color=['green', 'blue', 'orange'])

# Customize the chart
ax.set_ylabel('Market Size / Revenue (Million USD)')
ax.set_title('Market Sizes and Projected Revenue in Azerbaijan (2023)')
ax.set_ylim(0, 160)  # Set y-axis limit

# Add value labels on top of each bar
for bar in bars:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
            f'${height}M' if height >= 1 else f'${height*1000}K',
            ha='center', va='bottom')

# Add a note for the projected revenue
ax.annotate('*Average of $50K-$100K range', xy=(2, 0.075), xytext=(2, 10),
            arrowprops=dict(facecolor='black', shrink=0.05),
            ha='center', va='bottom')

# Adjust layout and display the plot
plt.tight_layout()
plt.show()

print("Graph generated successfully. The bar chart shows the market sizes for ecological products and mobile applications in Azerbaijan, as well as the projected annual revenue for the new app.")