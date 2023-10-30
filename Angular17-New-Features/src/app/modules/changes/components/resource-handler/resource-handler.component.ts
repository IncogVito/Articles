import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

require('disposablestack/auto');

class MockResourceHandler implements Disposable {
  connectionAquired = false;

  [Symbol.dispose](): void {
    this.connectionAquired = false;
    this.close();
  }

  executeStatement(statement: string) {
    if (!this.connectionAquired) {
      throw new Error("Connection not established!");
    }

    console.log(`Executing statement: ${statement}`)
  }

  connect() {
    console.log(`Connecting to mock resource handler.`)
      this.connectionAquired = true;
  }

  close() {
      console.log(`Closing mock resource handler.`)
      this.connectionAquired = false;;
  }
}

@Component({
  selector: 'app-resource-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-handler.component.html',
  styleUrls: ['./resource-handler.component.scss'],
})
export class ResourceHandlerComponent {


  constructor() {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    // Promień kuli
    const ballRadius = 10;

    // Pozycja początkowa kuli
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    // Prędkość początkowa kuli
    let dx = 2;
    let dy = -2;

    // Rysowanie kuli
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    }

    // Aktualizacja pozycji kuli i jej odbijanie od myszki
    function update() {
      // Wyczyść obszar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rysuj kulkę
      drawBall();

      // Odbijanie od myszki
      canvas.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if (mouseX > x - ballRadius && mouseX < x + ballRadius && mouseY > y - ballRadius && mouseY < y + ballRadius) {
          dx = -dx;
          dy = -dy;
        }
      });

      // Aktualizuj pozycję kuli
      x += dx;
      y += dy;

      // Odbijanie od krawędzi canvas
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }

      if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
      }

      requestAnimationFrame(update);
    }

    // Rozpocznij animację
    update();




  }


  public handleResourceOldWay() {
    let mockResourceHandler;
    try {
      mockResourceHandler = new MockResourceHandler();
      mockResourceHandler.connect();
      mockResourceHandler.executeStatement("SELECT * FROM USERS");

    } finally {
      mockResourceHandler?.close();
    }
  }

  public handleResourceNewWay() {
    using mockResourceHandler = new MockResourceHandler();
    mockResourceHandler.connect();
    mockResourceHandler.executeStatement("SELECT * FROM USERS");
  }






}
