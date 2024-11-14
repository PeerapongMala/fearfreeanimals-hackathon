package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "game_progress")
public class GameProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String animalType;

    private Integer currentLevel;

    private Boolean completed;

    public GameProgress() {}

    public GameProgress(User user, String animalType, Integer currentLevel, Boolean completed) {
        this.user = user;
        this.animalType = animalType;
        this.currentLevel = currentLevel;
        this.completed = completed;
    }

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

    public String getAnimalType() {
        return animalType;
    }

    public void setAnimalType(String animalType) {
        this.animalType = animalType;
    }

    public Integer getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    // Getters and Setters
}
