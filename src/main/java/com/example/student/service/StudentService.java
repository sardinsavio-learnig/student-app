package com.example.student.service;

import com.example.student.model.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public StudentService() {
        students.add(new Student(
                nextId.getAndIncrement(),
                "Arun",
                "arun@example.com",
                "Java"
        ));

        students.add(new Student(
                nextId.getAndIncrement(),
                "Priya",
                "priya@example.com",
                "Spring Boot"
        ));
    }

    public synchronized List<Student> getAllStudents() {
        return new ArrayList<>(students);
    }

    public synchronized Student addStudent(Student student) {
        student.setId(nextId.getAndIncrement());

        Student saved = new Student(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getCourse()
        );

        students.add(saved);
        return saved;
    }

    public synchronized boolean deleteStudent(Long id) {
        return students.removeIf(student ->
                student.getId().equals(id));
    }
}package com.example.student.service;

import com.example.student.model.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public StudentService() {
        students.add(new Student(
                nextId.getAndIncrement(),
                "Arun",
                "arun@example.com",
                "Java"
        ));

        students.add(new Student(
                nextId.getAndIncrement(),
                "Priya",
                "priya@example.com",
                "Spring Boot"
        ));
    }

    public synchronized List<Student> getAllStudents() {
        return new ArrayList<>(students);
    }

    public synchronized Student addStudent(Student student) {
        student.setId(nextId.getAndIncrement());

        Student saved = new Student(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getCourse()
        );

        students.add(saved);
        return saved;
    }

    public synchronized boolean deleteStudent(Long id) {
        return students.removeIf(student ->
                student.getId().equals(id));
    }
}
