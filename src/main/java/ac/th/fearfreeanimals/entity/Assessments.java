package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;

@Entity
public class Assessments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Username user;

    private Integer score;

    private Double fearPercentage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Username getUser() {
        return user;
    }

    public void setUser(Username user) {
        this.user = user;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Double getFearPercentage() {
        return fearPercentage;
    }

    public void setFearPercentage(Double fearPercentage) {
        this.fearPercentage = fearPercentage;
    }

    // Getters and Setters
}
