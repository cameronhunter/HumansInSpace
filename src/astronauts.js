import MessageFormat from './messageformat';
import entries from './entries';

export default function Astronauts({ crafts }) {
  const numberOfSpaceCrafts = entries(crafts).length;
  const numberOfAstronauts = entries(crafts).reduce((state, [_, crew]) => state + crew.length, 0);

  if (numberOfSpaceCrafts === 0) {
    return 'There are currently no humans in orbit.'
  } else {
    return (
      <speak>
        <s>
          <MessageFormat
            template='There {numberOfSpaceCrafts, plural, =0{no manned space crafts} one{is one manned space craft} other{are # manned space crafts}} in orbit{numberOfAstronauts, plural, =0{.} one{, crewed by a single astronaut.} other{, with # astronauts in total.}}'
            numberOfSpaceCrafts={numberOfSpaceCrafts}
            numberOfAstronauts={numberOfAstronauts} />
        </s>
        {numberOfAstronauts > 0 && <s>Would you like to hear the crew roster{numberOfAstronauts > 1 ? 's' : ''}?</s>}
      </speak>
    );
  }
}
