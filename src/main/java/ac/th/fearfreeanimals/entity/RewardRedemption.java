package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;


@Entity
public class RewardRedemption {

    @Id
   
    private Long id;
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "Id")
    private User user;
    private Long userId; // ตัวแปรนี้เก็บ ID ของผู้ใช้
    private Long rewardId;
    private boolean redeemed;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRewardId() {
        return rewardId;
    }

    public void setRewardId(Long rewardId) {
        this.rewardId = rewardId;
    }

    public boolean isRedeemed() {
        return redeemed;
    }

    public void setRedeemed(boolean redeemed) {
        this.redeemed = redeemed;
    }
}
