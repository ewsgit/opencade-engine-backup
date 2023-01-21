import initializeEngine from "./../../../2d/startup";
import { RenderableObject } from "../../../2d/rendererableObject";

initializeEngine((game) => {
  let layer = game.getLayer(0)

  layer.addEntity(
      new RenderableObject()
          .callback((obj) => {
            obj.velocity = 0
          })
          .onRender((obj) => {
            if (game.screen().height() <= obj.getHeight() + obj.getPosY())
              obj.velocity = obj.velocity * -0.99

            obj.velocity += 0.01
            obj.setPosY(obj.getPosY() + obj.velocity)
            return
          })
  )

})


