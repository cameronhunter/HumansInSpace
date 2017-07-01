import Skill from './index';
import Request from 'alexa-request';

jest.mock('./space');

test('Launch intent', () => {
  const event = Request.launchRequest().build();
  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('NumberOfAstronauts intent', () => {
  const event = Request.intent('NumberOfAstronauts').build();
  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Yes intent', () => {
  const crafts = { ISS: ['Peggy Whitson', 'Fyodor Yurchikhin', 'Jack Fischer'] };
  const event = Request.intent('AMAZON.YesIntent').session({ attributes: { crafts } }).build();
  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Help intent', () => {
  const event = Request.intent('AMAZON.HelpIntent').build();
  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Stop intent', () => {
  const event = Request.intent('AMAZON.StopIntent').build();
  return expect(Skill(event)).resolves.toMatchSnapshot();
});

test('Cancel intent', () => {
  const event = Request.intent('AMAZON.CancelIntent').build();
  return expect(Skill(event)).resolves.toMatchSnapshot();
});
