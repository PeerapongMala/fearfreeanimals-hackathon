package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // Enum (general, patient)

    private String accessCode;

    private Integer fearLevel;

    private Integer coins;

    // Relationships
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Assessment> assessments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<GameProgress> gameProgresses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<RewardRedemption> rewardRedemptions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getAccessCode() {
        return accessCode;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode;
    }

    public Integer getFearLevel() {
        return fearLevel;
    }

    public void setFearLevel(Integer fearLevel) {
        this.fearLevel = fearLevel;
    }

    public Integer getCoins() {
        return coins;
    }

    public void setCoins(Integer coins) {
        this.coins = coins;
    }

    public List<Assessment> getAssessments() {
        return assessments;
    }

    public void setAssessments(List<Assessment> assessments) {
        this.assessments = assessments;
    }

    public List<GameProgress> getGameProgresses() {
        return gameProgresses;
    }

    public void setGameProgresses(List<GameProgress> gameProgresses) {
        this.gameProgresses = gameProgresses;
    }

    public List<RewardRedemption> getRewardRedemptions() {
        return rewardRedemptions;
    }

    public void setRewardRedemptions(List<RewardRedemption> rewardRedemptions) {
        this.rewardRedemptions = rewardRedemptions;
    }

    // Getters and Setters
}
