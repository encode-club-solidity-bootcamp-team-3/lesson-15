import { Injectable } from '@nestjs/common';
import * as tokenJson from './assets/MyToken.json';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x208F75C3A395Ad125D0D641D9a2648F837a58538';

@Injectable()
export class AppService {
  contract: ethers.Contract;
  provider: ethers.JsonRpcProvider;
  wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      tokenJson.abi,
      this.wallet,
    );
  }

  getHello(): string {
    return 'Hello World!';
    // return 'Hello There!';
  }
  getAnotherThing(): string {
    return 'another thing';
  }
  getContractAddress(): string {
    return CONTRACT_ADDRESS;
  }
  getTotalSupply() {
    return this.contract.totalSupply();
  }
  getTokenBalance(address: string) {
    return this.contract.balanceOf(address);
  }
}
