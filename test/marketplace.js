require("chai").should();
require("chai").expect;

var MarketPlace = artifacts.require("./Marketplace.sol");

contract(MarketPlace, function(accounts) {
  beforeEach(async () => {
    this.tokenInstance = await MarketPlace.deployed();
  });

  describe("Marketplace validations", () => {
    it("Creates a Bid", async () => {
      const receipt = await this.tokenInstance.createBid(
        1000000000000000000,
        2000000000000000000,
        1,
        2551403850,
        { from: accounts[1] }
      );
      receipt.logs.length.should.be.equal(1, "trigger one event");
      receipt.logs[0].event.should.be.equal(
        "LogCreateBid",
        "should be the LogCreateBid event"
      );
      receipt.logs[0].args._farmer.should.be.equal(
        accounts[1],
        "should equal to inserted value"
      );
    });

    it("Gets a Bid", async () => {
      const bid = await this.tokenInstance.getBid(accounts[1], 0);
      bid[0].should.be.equal(accounts[1], "equal to inserted address");
      expect(bid[1].toNumber()).to.be.equal(
        1000000000000000000,
        "equal to inserted initialPrice"
      );
      expect(bid[2].toNumber()).to.be.equal(
        2000000000000000000,
        "equal to inserted buyoutPrice"
      );
      expect(bid[3].toNumber()).to.be.equal(
        1,
        "equal to inserted coffeeBatchId"
      );
      expect(bid[4].toNumber()).to.be.equal(
        2551403850,
        "equal to inserted timeLimit"
      );
      bid[5].should.be.equal(true, "equal to inserted status");
    });
  });
});
