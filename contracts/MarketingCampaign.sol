// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MarketingCampaign {

    enum Status { Created, Accepted, Completed, Paid }

    struct Campaign {
        address payable brand;
        address payable influencer;
        string description;
        uint amount;
        Status status;
        string proofLink;
    }

    uint public campaignCount;
    mapping(uint => Campaign) public campaigns;

    event CampaignCreated(uint campaignId, address brand, uint amount);
    event CampaignAccepted(uint campaignId, address influencer);
    event WorkSubmitted(uint campaignId, string proofLink);
    event PaymentReleased(uint campaignId);

    function createCampaign(string calldata _description) external payable {
        require(msg.value > 0, "Must send ETH for campaign");
        campaignCount++;
        campaigns[campaignCount] = Campaign(
            payable(msg.sender),
            payable(address(0)),
            _description,
            msg.value,
            Status.Created,
            ""
        );
        emit CampaignCreated(campaignCount, msg.sender, msg.value);
    }

    function acceptCampaign(uint _id) external {
        Campaign storage c = campaigns[_id];
        require(c.status == Status.Created, "Not available");
        c.influencer = payable(msg.sender);
        c.status = Status.Accepted;
        emit CampaignAccepted(_id, msg.sender);
    }

    function submitWork(uint _id, string calldata _proofLink) external {
        Campaign storage c = campaigns[_id];
        require(msg.sender == c.influencer, "Only influencer can submit");
        require(c.status == Status.Accepted, "Not accepted yet");
        c.proofLink = _proofLink;
        c.status = Status.Completed;
        emit WorkSubmitted(_id, _proofLink);
    }

    function releasePayment(uint _id) external {
        Campaign storage c = campaigns[_id];
        require(msg.sender == c.brand, "Only brand can release");
        require(c.status == Status.Completed, "Work not completed");
        c.status = Status.Paid;
        c.influencer.transfer(c.amount);
        emit PaymentReleased(_id);
    }
}
