import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

fig, ax= plt.subplots()

x = np.arange(0, 10, 0.1)



def animate(i):
    # update the data.
    #  If you print it i, You can see why it should be set to 2
    if len(ax.lines) == 2:
        ax.lines.pop(1)
    ax.plot(x[i], 0.5, 'o', color='red')
    ax.plot(10-x[i], 0.5, 'o', color='blue')
    return ax



ani = animation.FuncAnimation(
    fig, animate, frames=x.size, interval=100, blit=False, save_count=50)
plt.show()
