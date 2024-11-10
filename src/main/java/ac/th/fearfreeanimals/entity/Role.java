package ac.th.fearfreeanimals.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    GENERAL,
    PATIENT;

    @JsonCreator
    public static Role fromString(String value) {
        return value == null ? null : Role.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toString() {
        return name().toLowerCase();
    }
}
