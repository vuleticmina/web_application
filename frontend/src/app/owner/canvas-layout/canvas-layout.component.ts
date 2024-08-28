import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Shape } from 'src/app/model/shape';

@Component({
  selector: 'app-canvas-layout',
  templateUrl: './canvas-layout.component.html',
  styleUrls: ['./canvas-layout.component.css']
})
export class CanvasLayoutComponent {
  ngOnInit(): void {
    const canvasElement = this.canvasElement.nativeElement;
    const context = canvasElement.getContext('2d');
    if (context) {
      this.ctx = context;
      this.ctx.lineWidth = 2;
    } else {
      throw new Error('Unable to get 2D context');
    }
    canvasElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvasElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvasElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    canvasElement.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    
  }

  @Input()
  type: string = "";

  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private shapes: any[] = [];
  private selectedFile: File | undefined;
  private selectedShape: any | null = null;
  private offsetX: number = 0;
  private offsetY: number = 0;
  capacity: number = 0;
  errorMessage: string = "";


  private getAdjustedMousePosition(event: MouseEvent): { offsetX: number, offsetY: number } {
    const canvasElement = this.canvasElement.nativeElement;
    const rect = canvasElement.getBoundingClientRect(); 
    const scaleX = canvasElement.width / rect.width;   
    const scaleY = canvasElement.height / rect.height; 
  
    const offsetX = (event.clientX - rect.left) * scaleX;
    const offsetY = (event.clientY - rect.top) * scaleY;
  
    return { offsetX, offsetY};
  }
  
  saveLayout() {
    const json = JSON.stringify(this.shapes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'layout.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  private drawShape(shape: any): void {
    this.errorMessage = "";
    this.ctx.fillStyle = shape.color;
    if (shape.type === 'rect') {
      this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === 'circle') {
      this.ctx.beginPath();
      this.ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawGreenery(): void {
    let greenery = { type: 'rect', x: 50, y: 50, width: 50, height: 50, color: "lightgreen", object: 'greenery' } as Shape;
    if(!this.checkCollisions(greenery)){
      this.shapes.push(greenery);
      this.drawShape(greenery);
    } else {
      this.errorMessage = "There is no space for greenery!"
    }
  }

  drawPool(): void {
    const pool = { type: 'rect', x: 100, y: 100, width: 600, height: 200, color: 'lightblue', object: 'pool' } as Shape; 
    if(!this.checkCollisions(pool)){
      this.shapes.push(pool);
      this.drawShape(pool);
    } else {
      this.errorMessage = "There is no space for pool!"
    }
  }

  drawFountain(): void {
    const fountain = { type: 'circle', x: 400, y: 150, radius: 70, color: 'lightblue', object: 'fountain' } as Shape;
    if(!this.checkCollisions(fountain)){
      this.shapes.push(fountain);
      this.drawShape(fountain);
    } else {
      this.errorMessage = "There is no space for fountain!"
    }
  
  }

  drawTable(): void {
    const table = { type: 'circle', x: 200, y: 300, radius: 30, color: 'lightpink', object: 'table' } as Shape;
    if(!this.checkCollisions(table)){
      this.shapes.push(table);
      this.drawShape(table);
    } else {
      this.errorMessage = "There is no space for table!"
    }
  }

  drawChair(): void {
    const chair = { type: 'rect', x: 350, y: 250, width: 60, height: 30, color: 'lightgray', object: 'chair' } as Shape;
    if(!this.checkCollisions(chair)){
      this.shapes.push(chair);
      this.drawShape(chair);
    } else {
      this.errorMessage = "There is no space for chair!"
    }
  }

  loadFromFile(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const layout = JSON.parse(e.target.result);
      this.shapes = layout.shapes;
      this.redrawCanvas();
    };
    reader.readAsText(file);
  }

  private redrawCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
    this.shapes.forEach(shape => this.drawShape(shape));
  }


  getLayout(){
    const json = JSON.stringify(this.shapes);
    return json;
  }

  loadLayout() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        this.shapes = JSON.parse(json);
        this.redrawCanvas();
      };
      reader.readAsText(this.selectedFile);
    }
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }


  onMouseDown(event: MouseEvent): void {
    const { offsetX, offsetY } = this.getAdjustedMousePosition(event);
    this.selectedShape = this.shapes.find(shape => this.isMouseOnShape(shape, offsetX, offsetY));
    if (this.selectedShape) {
      this.offsetX = offsetX - this.selectedShape.x;
      this.offsetY = offsetY - this.selectedShape.y;
    }
  }

  onMouseUp(event: MouseEvent): void {
    this.selectedShape = null;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.selectedShape) {
      const { offsetX, offsetY } = this.getAdjustedMousePosition(event);
      let oldX = this.selectedShape.x;
      let oldY = this.selectedShape.y;

      this.selectedShape.x = offsetX - this.offsetX;
      this.selectedShape.y = offsetY - this.offsetY;

      if (!this.checkCollisions(this.selectedShape)) {
        this.redrawCanvas();
      } else {
        this.selectedShape.x = oldX;
        this.selectedShape.y = oldY;
      }
    }
  }

  private isMouseOnShape(shape: any, x: number, y: number): boolean {
    if (shape.type === 'rect') {
      return x > shape.x && x < shape.x + shape.width && y > shape.y && y < shape.y + shape.height;
    } else if (shape.type === 'circle') {
      const distance = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
      return distance < shape.radius;
    }
    return false;
  }

  rectanglesCollision(rect1: any, rect2: any): boolean {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
  }
  circleRectangleCollision(circle: any, rect: any): boolean {
    let closestX = this.clamp(circle.x, rect.x, rect.x + rect.width);
    let closestY = this.clamp(circle.y, rect.y, rect.y + rect.height);
    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    console.log(distanceSquared)
    return distanceSquared < (circle.radius * circle.radius);
  }

  circlesCollision(circle1: any, circle2: any): boolean {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distanceSquared = dx * dx + dy * dy;
    const radiusSum = circle1.radius + circle2.radius;
    return distanceSquared < radiusSum * radiusSum;
}

  clamp(value: number, min: number, max: number): number {
    if (value < min) return min;
    if(value > max) return max;
    return value;
  }

  checkCollisions(newShape: any) {
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      if(newShape == shape) continue;

      if (newShape.type === 'circle' && shape.type === 'rect') {
          if (this.circleRectangleCollision(newShape, shape)) {
              return true;
          }
      } else if (newShape.type === 'rect' && shape.type === 'circle') {
          if (this.circleRectangleCollision(shape, newShape)) {
              return true;
          }
      } else if (newShape.type === 'circle' && shape.type === 'circle'){
        if (this.circlesCollision(shape, newShape)) {
          return true;
        }
      } else {
        if (this.rectanglesCollision(newShape, shape)) {
          return true;
        }
      }  
    }
    return false;
  }

  
  onMouseLeave(event: MouseEvent) {
    this.selectedShape = null;
  }


}
