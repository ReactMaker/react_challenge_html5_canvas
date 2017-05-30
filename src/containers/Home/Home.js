import React, { Component } from 'react';

import './Home.less';

export default class Home extends Component {
  ctx = null;
  isDrawing = false;
  lastX = 0;
  lastY = 0;
  hue = 0;
  lineWidth = 1;
  direction = true;

  componentDidMount() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const ctx = this.canvas.getContext('2d');
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = this.lineWidth;

    this.ctx = ctx;
  }

  handleMouseDown = (e) => {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
  }

  handleMouseMove = (e) => {
    if (!this.isDrawing) return;
    this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    this.ctx.stroke();
    [this.lastX, this.lastY] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

    this.hue += 1;
    if (this.hue >= 360) {
      this.hue = 0;
    }

    if (this.ctx.lineWidth >= 100 || this.ctx.lineWidth <= 1) {
      this.direction = !this.direction;
    }

    if (this.direction) {
      this.ctx.lineWidth += 1;
    } else {
      this.ctx.lineWidth -= 1;
    }
  }

  render() {
    return (
      <div id="home">
        <canvas
          id="draw"
          ref={canvas => (this.canvas = canvas)}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={() => (this.isDrawing = false)}
          onMouseOut={() => (this.isDrawing = false)}
        />
      </div>
    );
  }
}
