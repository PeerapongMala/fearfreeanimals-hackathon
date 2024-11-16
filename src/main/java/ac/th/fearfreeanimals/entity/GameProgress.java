package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "game_progress")
public class GameProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String description; // ข้อความที่ผู้ป่วยสามารถใส่ในแต่ละด่าน

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "animal_type")
    private String animalType;

    @Column(name = "current_level", nullable = false)
    private Integer currentLevel = 1;

    @Column(name = "completed", nullable = false)
    private Boolean completed = false;

    public GameProgress() {}

    public GameProgress(User user, String animalType) {
        this.user = user;
        this.animalType = animalType;
        this.currentLevel = 1;
        this.completed = false;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getters and setters
}
