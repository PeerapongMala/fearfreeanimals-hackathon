package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.Assessment;
import ac.th.fearfreeanimals.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assessments")
public class AssessmentController {

    private final AssessmentRepository assessmentRepository;

    @Autowired
    public AssessmentController(AssessmentRepository assessmentRepository) {
        this.assessmentRepository = assessmentRepository;
    }

    // Get all assessments
    @GetMapping
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        List<Assessment> assessments = assessmentRepository.findAll();
        return ResponseEntity.ok(assessments);
    }

    // Create new assessment
    @PostMapping
    public ResponseEntity<Assessment> createAssessment(@RequestBody Assessment assessment) {
        Assessment createdAssessment = assessmentRepository.save(assessment);
        return ResponseEntity.ok(createdAssessment);
    }

    // Get assessment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getAssessmentById(@PathVariable Long id) {
        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found with id " + id));
        return ResponseEntity.ok(assessment);
    }
}
