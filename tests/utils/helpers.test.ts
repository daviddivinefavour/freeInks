import { expect } from 'chai';
import helpers from '../../app/utils/helpers';

describe('generateRandomDigits()', () => {
  const num = 3;
  const result = helpers.generateRandomDigits(num);
  it('should generate random digits with correct length', () => {
    expect(result).to.be.a('number');
    expect(result.toString().length).to.equal(num);
  });

  it('should generate random digits within the expected range', () => {
    expect(result).to.be.a('number');
    expect(result).to.be.at.least(100);
    expect(result).to.be.below(1000);
  });
  it('returned result should be of type number', () => {
    expect(typeof result).to.be.equal('number');
  });
});
