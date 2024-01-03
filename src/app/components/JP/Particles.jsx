import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas";
import img from "./img";

export default class Particles extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.scrollCoordinate)
    this.index = 0;
    this.loaded = false;
    this.renderProton = this.renderProton.bind(this);
  }

  handleCanvasInited(canvas) {
    this.loadImage(canvas);
    RAFManager.add(this.renderProton);
  }

  componentWillUnmount() {
    try {
      RAFManager.remove(this.renderProton);
      this.proton.destroy();
    } catch (e) {}
  }

  loadImage(canvas) {
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = (e) => {
      var rect = new Proton.Rectangle(
        (canvas.width - e.target.width) / 2,
        (canvas.height - e.target.height) / 2,
        e.target.width,
        e.target.height
      );

      context.drawImage(e.target, rect.x, rect.y);
      this.createProton(canvas, rect);
      this.loaded = true;
    };

    image.src = img;
  }

  createProton(canvas, rect) {
    const context = canvas.getContext("2d");
    const proton = new Proton();
    const emitter = new Proton.Emitter();
    //setRate
    emitter.rate = new Proton.Rate(
      new Proton.Span(35, 44),
      new Proton.Span(.03)
    );
    //addInitialize
    emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, 0)));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(1, 3));
    emitter.addInitialize(new Proton.Life(2));
    var imagedata = context.getImageData(
      rect.x,
      rect.y ,
      rect.width,
      rect.height
    );
    emitter.addInitialize(
      new Proton.P(new Proton.ImageZone(imagedata, rect.x, rect.y + 50))
    );

    //addBehaviour
    const randomBehaviour = new Proton.RandomDrift(2, 5, .85);
    const gravity = new Proton.Gravity(0);
    emitter.addBehaviour(this.customScaleBehaviour());
    emitter.addBehaviour(gravity);
    emitter.addBehaviour(randomBehaviour);
    emitter.addBehaviour(new Proton.Color(["#00a9e0"]));
    emitter.addBehaviour(
      new Proton.CrossZone(
        new Proton.RectZone(0, 0, canvas.width, canvas.height),
        "collision"
      )
    );
    emitter.emit();
    proton.addEmitter(emitter);

    const renderer = new Proton.CanvasRenderer(canvas);
    proton.addRenderer(renderer);

    this.proton = proton;
    this.gravity = gravity;
    this.renderer = renderer;
    this.randomBehaviour = randomBehaviour;
  }

  customScaleBehaviour() {
    return {
      initialize: function (particle) {
        particle.oldRadius = particle.radius;
        particle.scale = 0;
      },
      applyBehaviour: function (particle) {
        if (particle.energy >= 2 / 3) {
          particle.scale = (1 - particle.energy) * 3;
        } else if (particle.energy <= 1 / 3) {
          particle.scale = particle.energy * 3;
        }
        particle.radius = particle.oldRadius * particle.scale;
      }
    };
  }

  handleResize(width, height) {
    this.renderer.resize(width, height);
  }


handleMouseDown(e) {
  this.index++;
  if (this.index % 2 === 1){
    this.randomBehaviour.reset(50, 50, 0.1);
    this.gravity.reset(0);
    
  } else {
    this.randomBehaviour.reset(2, 2, 0.2);
    this.gravity.reset(0);
  }
}



  renderProton() {
    if (!this.loaded) return;
    this.proton.update();
    this.proton.stats.update(2);
  }

  render() {
    return (
      <Canvas
        globalCompositeOperation="screen"
        onMouseDown={this.handleMouseDown.bind(this)}
        onCanvasInited={this.handleCanvasInited.bind(this)}
        onResize={this.handleResize.bind(this)}
      />
    );
  }
}
