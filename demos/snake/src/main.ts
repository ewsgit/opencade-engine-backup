import initializeEngine from "./../../../2d/startup";
import { RenderableObject } from "../../../2d/rendererableObject";

initializeEngine((game) => {
  let background = game.getLayer(0);

  background.addEntity(
    // creates a falling default object ( for engine testing )
    // @ts-ignore
    new RenderableObject().onRender((obj) => {
      if (obj.getPosY() + 1 + obj.getHeight() > game.screen().height())
        return obj.setPosY(game.screen().height() - obj.getHeight());

      obj.setPosY(obj.getPosY() + 1);
    })
  );
});
