import { Skill, Launch, Intent } from 'alexa-annotations';
import Response, { say } from 'alexa-response';
import space from './space';
import Astronauts from './astronauts';
import entries from './entries';

export class Space {

  @Launch
  @Intent('NumberOfAstronauts')
  numberOfAstronauts() {
    return space().then(({ number, people }) => {
      const crafts = people.reduce((state, { name, craft }) => ({ ...state, [craft]: [...(state[craft] || []), name] }), {});
      return Response.build({
        ask: (
          <speak>
            <s>Space, the final frontier!</s>
            <Astronauts crafts={crafts} />
          </speak>
        ),
        reprompt: number > 0 ? 'Would you like me to tell you who is in space?' : undefined,
        attributes: number > 0 ? { crafts } : undefined
      });
    }).catch((error) => {
      console.error(error);
      return say("I'm having trouble counting the number of people in orbit, please try again later.");
    });
  }

  @Intent('AMAZON.YesIntent')
  yes(slots, event) {
    const crafts = event && event.session && event.session.attributes && event.session.attributes.crafts;

    if (crafts) {
      return this.astronautNames(entries(crafts));
    } else {
      return this.numberOfAstronauts();
    }
  }

  astronautNames(crafts) {
    if (crafts.length > 0) {
      return Response.build({
        say: (
          <speak>
            {crafts.map(([craft, crew]) => (
              <speak>
                <p>On the crew roster for "{craft}", is:</p>
                <speak>{crew.map((name) => <s>{name}</s>)}</speak>
                <break time='1s' />
              </speak>
            ))}
            <s>Live long and prosper! Goodbye.</s>
          </speak>
        )
      });
    } else {
      return say('There are currently no astronauts in space.');
    }
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.build({
      ask: 'I tell you about astronauts currently in space. Would you like to know how many are in orbit?',
      reprompt: 'Would you like to know how many astronauts are currently in orbit?',
      attributes: { crafts: null }
    });
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent', 'AMAZON.NoIntent')
  stop() {
    return say('Live long and prosper! Goodbye.');
  }

}

export default Skill(Space);
