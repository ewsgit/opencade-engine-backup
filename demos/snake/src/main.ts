import initializeEngine from "./../../../2d/startup";
import { RenderableObject } from "../../../2d/rendererableObject";

initializeEngine((game) => {
  let layer = game.getLayer(0)

  layer.addEntity(
      new RenderableObject()
          .onRender(obj => {
            obj.setPosX(obj.getPosX() + 1)
          })
  )

  layer.addEntity(
      new RenderableObject().setPosX(50)
  )

  layer.addEntity(
      new RenderableObject().setPosX(50).setPosY(30)
  )

})


