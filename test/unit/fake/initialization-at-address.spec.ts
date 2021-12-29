import { FakeContract, smock } from '@src';
import { PickyReturner, Returner } from '@typechained';
import chai, { expect } from 'chai';
import { ethers } from 'hardhat';

chai.should();
chai.use(smock.matchers);

describe('Initialization:: FakeAtAddress', () => {
  let fake: FakeContract<Returner>;
  let fakeAtAddress: FakeContract<PickyReturner>;

  beforeEach(async () => {
    fake = await smock.fake<Returner>('Returner');
    fakeAtAddress = await smock.fake<PickyReturner>('PickyReturner', {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    });
  });

  it('should be able to revert without reason', async () => {
    fake.fallback.reverts();

    await expect(ethers.provider.call({ to: fake.address })).to.be.reverted;
  });
});
