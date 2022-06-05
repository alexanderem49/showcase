import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { experimentalAddHardhatNetworkMessageTraceHook } from "hardhat/config";
import { Donation } from "../typechain";

describe("Donation test", async function () {
    let donation: Donation;
    let signers: SignerWithAddress[];

    before(async () => {
        signers = await ethers.getSigners();
    })

    beforeEach(async () => {
        const Donation = await ethers.getContractFactory("Donation");
        donation = await Donation.deploy();
    })

    it("Should make a donation", async () => {
        await donation.donate({ value: parseEther("1.0") });
    })

    it("Should make a donation", async () => {
        const value = parseEther("1.0");
        await donation.donate({ value: value });
        const signer = signers[0];
        const sum = await donation.getDonationSum(signer.address);
        expect(sum).to.be.equal(value);
    })

    it("Should be passed by Github", async () => {
        expect(2 + 2).to.be.equal(4);
    })
});