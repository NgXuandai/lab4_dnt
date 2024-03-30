import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import TrackPlayer, { Track, Capability } from 'react-native-track-player';

const Bai3 = () => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    let trackChangeListener: any = null;

    useEffect(() => {
        setupPlayer();
        return () => {
             //TrackPlayer.destroy(); // Teardown TrackPlayer when component unmounts
            if (trackChangeListener) {
                trackChangeListener.remove();
            }
        };
    }, []);

    const setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(tracks);
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ]
        });
        trackChangeListener = TrackPlayer.addEventListener('playback-track-changed', onTrackChange);
    };

    const onTrackChange = async (data: { nextTrack: string }) => {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        setCurrentTrack(track);
    };

    const play = async () => {
        await TrackPlayer.play();
    };

    const pause = async () => {
        await TrackPlayer.pause();
    };

    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    };

    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const seekTo = async (position: number) => {
        await TrackPlayer.seekTo(position);
    };

    const tracks: Track[] = [
        {
            id: '1',
            url: require('./tracks/HoaiMong-KhaNguyenTrongTai-12652247.mp3'),
            title: 'Hoài Mộng',
            artist: 'Nguyễn Trọng Tài',
            artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlVwbAUMQIvO9tv0MJTXK3UPznX_PuW3aIfQ&usqp=CAU'
        },
        {
            id: '2',
            url: require('./tracks/KhiTaChanNhau-HuongGiangPhamHongPhuoc-12707330.mp3'),
            title: 'Nhớ em',
            artist: 'Phạm Hường Giang',
            artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxGoUxnjwdr64q2GGD88WMwdtbRzmLxRz7Sg&usqp=CAU'
        },
        // Add more tracks as needed
    ];

    return (
        <View style={styles.container}>

            <Text style ={styles.titleName}>HieuMP3</Text>
            <View style={styles.songContainer}>
                {currentTrack && (
                    <>
                        <Image source={{uri: currentTrack.artwork}} style={styles.artwork} />
<Text style={styles.songTitle}>{currentTrack.title}</Text>
                    </>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={play}>
                    <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={pause}>
                    <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={skipToNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={skipToPrevious}>
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => seekTo(30)}>
                    <Text style={styles.buttonText}>Seek</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    songContainer: {
        alignItems: 'center',
        marginTop: 100
    },
    artwork: {
        width: 400,
        height: 400,
        marginBottom: 10,
    },
    songTitle: {
        fontSize: 20,
        fontWeight:'bold',
        color: 'white',
        margin: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 150
    },
    buttonText: {
        color: 'white',
    },

    titleName:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'white'
    }
});

export default Bai3;