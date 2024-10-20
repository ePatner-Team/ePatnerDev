package com.customerRelationship.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customerRelationship.entity.Reward;
import com.customerRelationship.repository.RewardRepository;
import java.util.List;
import java.util.Optional;

@Service
public class RewardService {

    @Autowired
    private RewardRepository rewardRepository;

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public Optional<Reward> getRewardById(Long id) {
        return rewardRepository.findById(id);
    }

    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    public Reward updateReward(Long id, Reward rewardDetails) {
        Reward reward = rewardRepository.findById(id).orElse(null);
        if (reward != null) {
            reward.setName(rewardDetails.getName());
            reward.setDescription(rewardDetails.getDescription());
            reward.setPointsRequired(rewardDetails.getPointsRequired());
            return rewardRepository.save(reward);
        }
        return null;
    }

    public void deleteReward(Long id) {
        rewardRepository.deleteById(id);
    }
}

